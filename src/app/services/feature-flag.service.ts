import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagService {
  constructor(private remoteConfig: AngularFireRemoteConfig) {
    this.initRemoteConfig();
  }

  async initRemoteConfig() {
    try {
      await this.remoteConfig.fetchAndActivate();
      console.log('Remote Config initialized and activated');
    } catch (error) {
      console.error('Error initializing Remote Config', error);
    }
  }

  async isNewFeatureEnabled(): Promise<boolean> {
    const value = await this.remoteConfig.getString('new_feature_enabled');
    return value === 'true';
  }
}
