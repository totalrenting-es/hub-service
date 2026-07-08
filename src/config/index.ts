export class Config {
  // Server
  public nodeEnv: string;
  public port: number;
  public host: string;
  public apiPrefix: string;

  // Alphabet
  public alphabet: {
    apiUrl: string;
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    grantType: string;
  };

  // Vixiees Webhook Destinations
  public vixiees: {
    totalrenting: {
      destinations: string[];
    };
    twipo: {
      destinations: string[];
    };
  };

  // Integrations-service (interno, core-network): destino al que el hub reenvía
  // el webhook de HubSpot para que cree el lead en Avanti.
  public integrations: {
    url: string;
    leadWebhookPath: string;
  };

  // Identity-service: valida el login del panel /docs y custodia los permisos.
  public identityServiceUrl: string;
  public identityInternalSecret: string;
  public jwt: { secret: string };
  public google: { clientId: string };

  constructor() {
    // Server
    this.nodeEnv = process.env.NODE_ENV || 'development';
    this.port = parseInt(process.env.PORT || '3002', 10);
    this.host = process.env.HOST || '0.0.0.0';
    this.apiPrefix = process.env.API_PREFIX || '/api';

    // Alphabet
    this.alphabet = {
      apiUrl: process.env.ALPHABET_API_URL || '',
      tokenUrl: process.env.ALPHABET_TOKEN_URL || '',
      clientId: process.env.ALPHABET_CLIENT_ID || '',
      clientSecret: process.env.ALPHABET_CLIENT_SECRET || '',
      grantType: process.env.ALPHABET_GRANT_TYPE || 'client_credentials'
    };

    // Vixiees Webhook Destinations (comma-separated URLs)
    this.vixiees = {
      totalrenting: {
        destinations: this.parseDestinations(process.env.VIXIEES_TOTALRENTING_DESTINATIONS || '')
      },
      twipo: {
        destinations: this.parseDestinations(process.env.VIXIEES_TWIPO_DESTINATIONS || '')
      }
    };

    // Integrations-service (interno)
    this.integrations = {
      url: process.env.INTEGRATIONS_SERVICE_URL || 'http://integrations-service:3004',
      leadWebhookPath: '/api/hubspot/webhooks/lead-perdido-avanti'
    };

    // Identity-service + auth del panel de docs
    this.identityServiceUrl = process.env.IDENTITY_SERVICE_URL || 'http://localhost:3001';
    this.identityInternalSecret = process.env.INTERNAL_SECRET || '';
    this.jwt = { secret: process.env.JWT_SECRET || '' };
    this.google = { clientId: process.env.GOOGLE_CLIENT_ID || '' };
  }

  private parseDestinations(envValue: string): string[] {
    return envValue
      .split(/[\n,]/)
      .map((url) => url.trim())
      .filter(Boolean);
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }
}

const config = new Config();
export default config;
