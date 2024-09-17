import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ProductsService {
  constructor(private configService: ConfigService) {}

  async getAccessToken(): Promise<string> {
    const tokenUrl = this.configService.get<string>('tokenUrl');
    const clientId = this.configService.get<string>('clientId');
    const clientSecret = this.configService.get<string>('clientSecret');

    const response = await axios.post(tokenUrl, {
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
      scope:
        'api_client_read api_client_write cart_rule_write customer_group_read customer_group_write hook_read hook_write module_read module_write product_read product_write',
    });

    return response.data.access_token;
  }

  async getProducts(): Promise<any> {
    const apiUrl = this.configService.get<string>('apiUrl');
    const accessToken = await this.getAccessToken();

    const response = await axios.get(`${apiUrl}/products`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}
