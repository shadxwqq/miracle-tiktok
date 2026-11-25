declare module 'claude-code' {
  interface PluginState {
    MiracleTikTok: {
      selectedRegion: string;
      accentColor: string;
      themeMode: 'light' | 'dark' | 'system';
      usePhoneColors: boolean;
      customAccentColor?: string;
      presets: Array<{
        id: string;
        name: string;
        region: string;
        accentColor: string;
        themeMode: 'light' | 'dark' | 'system';
      }>;
    };
  }
}
