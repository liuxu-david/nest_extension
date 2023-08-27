import { Injectable, Logger } from '@nestjs/common';
import { ApiAuth } from './server.dto';
import { ConfigService } from '@nestjs/config';
import { staticPath } from '../../common/path.static';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class EzService {
  private apiAuth: ApiAuth;
  private accessToken: string;
  private readonly basicHeaders: object;
  private readonly logger = new Logger(EzService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  )
  {
    this.apiAuth = {
      basicUrl: this.configService.get("EZCLOUD_BASIC_URL"),
      username: this.configService.get("EZCLOUD_USERNAME"),
      password: this.configService.get("EZCLOUD_PASSWORD"),
      clientId: this.configService.get("EZCLOUD_CLIENT_ID"),
      clientSecret: this.configService.get("EZCLOUD_CLIENT_SECRET")
    };
    this.initAccessToken()
    this.basicHeaders = {
      "Content-Type": "application/json",
    };
  }

  async initAccessToken() {
    try {
      this.accessToken = await this.fetchAccessToken();
      // 在请求头中添加 Token
      this.basicHeaders["Authorization"] = `Bearer ${this.accessToken}`;
      // console.log(this.basicHeaders["Authorization"] );
    } catch (error) {
      console.error('Error initializing access token:', error);
    }
  }

  async fetchAccessToken() {
    const [method, url] = staticPath.token
    const res = await this.httpService.axiosRef.request({
      method,
      url: this.apiAuth.basicUrl + url,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        grant_type: "password",
        username: this.apiAuth.username,
        password: this.apiAuth.password,
        client_id: this.apiAuth.clientId,
        client_secret: this.apiAuth.clientSecret,
      }
    })
    const content = res.data
    // console.log(content,'content')
    return content.access_token
  }

  async mutation(info:any) {
    try {
      const res = await this.httpService.axiosRef.request({
        method: info.method,
        url: this.apiAuth.basicUrl + info.url,
        headers: {...this.basicHeaders, ...(info.headers || {})},
        ...(info.options || {}),  // key: params || data
      });
      const content = res.data;
      this.logger.log(`[MUTATION] ${info.method} ${info.url} res:`, content);
      const {code, message, data} = content || {}
      if (code === 0) {
        return data
      } else if (code === 401) {
        this.accessToken = await this.fetchAccessToken();
        this.basicHeaders["Authorization"] = `Bearer ${this.accessToken}`
        const refreshedRs = await this.httpService.axiosRef.request({
          method: info.method,
          url: this.apiAuth.basicUrl + info.url,
          headers: { ...this.basicHeaders, ...(info.headers || {}) },
          ...(info.options || {}), // key: params || data
        });
        const refreshedContent = refreshedRs.data;
        this.logger.log(`[MUTATION] Refreshed token and retried request:`, refreshedContent?.data);
        return refreshedContent.data;
      }
    } catch (err) {
      console.log(err.content,'err');
    }
  }
}


