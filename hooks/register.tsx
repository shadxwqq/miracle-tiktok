import { Register, atom } from 'claude-code';

const REGIONS = [
  { code: 'NL', name: 'Netherlands' },
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'PT', name: 'Portugal' },
  { code: 'GR', name: 'Greece' },
  { code: 'PL', name: 'Poland' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'RO', name: 'Romania' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'FI', name: 'Finland' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
];

const TIKTOK_BRAND_COLOR = '#FE2C55';

const DEFAULT_STATE = {
  selectedRegion: 'NL',
  accentColor: TIKTOK_BRAND_COLOR,
  themeMode: 'system' as const,
  usePhoneColors: true,
  presets: [
    {
      id: 'default',
      name: 'Default (TikTok Pink)',
      region: 'NL',
      accentColor: TIKTOK_BRAND_COLOR,
      themeMode: 'system' as const,
    },
  ],
};

export const register: Register = (on, options) => {
  on('session.start', async ($) => {
    $.command.register({
      name: 'miracletiktok',
      description: 'Open MargyT TikTok mod settings panel',
    });
  });

  on('command.run', { command: 'miracletiktok' }, async ($, e, next) => {
    try {
      $.ui.open({
        id: 'miracletiktok-panel',
        title: 'MargyT Settings',
      });
      return next(e);
    } catch (error) {
      $.ui.toast('Failed to open MargyT Settings');
      return next(e);
    }
  });

  on('ui.render', { component: 'Pane', requestId: 'miracletiktok-panel' }, async ($, e, next) => {
    const { Box, Text, Button, Select, Input, Toggle } = $.ui.resolve(e);

    // Get current state or use defaults
    const stateValue = $.store.get('MiracleTikTok') || DEFAULT_STATE;

    const updateState = (updates: Partial<typeof DEFAULT_STATE>) => {
      const newState = { ...stateValue, ...updates };
      $.store.set('MiracleTikTok', newState);
    };

    return (
      <Box flexDirection="column" padding={16} gap={16}>
        {/* Header */}
        <Box flexDirection="column" gap={8}>
          <Text bold size="lg">
            MargyT TikTok Configuration
          </Text>
          <Text dimmed size="sm">
            Customize region, colors, and theme for TikTok mod
          </Text>
        </Box>

        {/* Region Selection */}
        <Box flexDirection="column" gap={8}>
          <Text bold>Region</Text>
          <Box flexDirection="column" gap={4}>
            <Text size="sm" dimmed>
              Current: {REGIONS.find((r) => r.code === stateValue.selectedRegion)?.name}
            </Text>
            <Select
              value={stateValue.selectedRegion}
              onChange={(value) => {
                updateState({ selectedRegion: value });
              }}
              options={REGIONS.map((r) => ({ label: r.name, value: r.code }))}
            />
          </Box>
        </Box>

        {/* Theme Mode */}
        <Box flexDirection="column" gap={8}>
          <Text bold>Theme</Text>
          <Box flexDirection="row" gap={8}>
            {(['light', 'dark', 'system'] as const).map((mode) => (
              <Button
                key={mode}
                onClick={() => {
                  updateState({ themeMode: mode });
                }}
                variant={stateValue.themeMode === mode ? 'primary' : 'secondary'}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Phone Colors Toggle */}
        <Box flexDirection="row" gap={12} alignItems="center">
          <Toggle
            value={stateValue.usePhoneColors}
            onChange={(value) => {
              updateState({ usePhoneColors: value });
            }}
          />
          <Box flexDirection="column" gap={2}>
            <Text bold>Use Phone Colors</Text>
            <Text size="sm" dimmed>
              Apply wallpaper palette on Android 12+
            </Text>
          </Box>
        </Box>

        {/* Accent Color */}
        <Box flexDirection="column" gap={8}>
          <Text bold>Accent Color</Text>
          <Box flexDirection="row" gap={8} alignItems="center">
            <Box
              width={40}
              height={40}
              backgroundColor={stateValue.accentColor}
              borderRadius={8}
              borderStyle="solid"
              borderWidth={2}
              borderColor="#ccc"
            />
            <Input
              value={stateValue.accentColor}
              onChange={(value) => {
                if (/^#[0-9A-F]{6}$/i.test(value)) {
                  updateState({ accentColor: value });
                }
              }}
              placeholder="#FE2C55"
            />
            <Button
              onClick={() => {
                updateState({ accentColor: TIKTOK_BRAND_COLOR });
              }}
              variant="secondary"
            >
              Reset
            </Button>
          </Box>
        </Box>

        {/* Presets */}
        <Box flexDirection="column" gap={8}>
          <Text bold>Presets</Text>
          <Box flexDirection="column" gap={6}>
            {stateValue.presets.map((preset) => (
              <Box
                key={preset.id}
                flexDirection="row"
                gap={8}
                padding={8}
                backgroundColor={preset.id === 'default' ? '#f5f5f5' : '#fff'}
                borderStyle="solid"
                borderWidth={1}
                borderColor="#ddd"
                borderRadius={6}
                alignItems="center"
              >
                <Box
                  width={24}
                  height={24}
                  backgroundColor={preset.accentColor}
                  borderRadius={4}
                />
                <Box flexDirection="column" flex={1} gap={2}>
                  <Text bold size="sm">
                    {preset.name}
                  </Text>
                  <Text size="xs" dimmed>
                    {REGIONS.find((r) => r.code === preset.region)?.name} •{' '}
                    {preset.themeMode}
                  </Text>
                </Box>
                {preset.id !== 'default' && (
                  <Button
                    onClick={() => {
                      updateState({
                        selectedRegion: preset.region,
                        accentColor: preset.accentColor,
                        themeMode: preset.themeMode,
                      });
                      $.ui.toast(`Applied preset: ${preset.name}`);
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Apply
                  </Button>
                )}
                {preset.id !== 'default' && (
                  <Button
                    onClick={() => {
                      updateState({
                        presets: stateValue.presets.filter((p) => p.id !== preset.id),
                      });
                    }}
                    variant="secondary"
                    size="sm"
                  >
                    Delete
                  </Button>
                )}
              </Box>
            ))}
          </Box>
          <Button
            onClick={() => {
              const newPreset = {
                id: Date.now().toString(),
                name: `Preset ${stateValue.presets.length}`,
                region: stateValue.selectedRegion,
                accentColor: stateValue.accentColor,
                themeMode: stateValue.themeMode,
              };
              updateState({
                presets: [...stateValue.presets, newPreset],
              });
              $.ui.toast('Preset saved');
            }}
            variant="primary"
          >
            Save Current Settings as Preset
          </Button>
        </Box>

        {/* Info */}
        <Box flexDirection="column" gap={4} padding={8} backgroundColor="#f9f9f9" borderRadius={6}>
          <Text bold size="sm">
            ℹ️ About MargyT
          </Text>
          <Text size="xs" dimmed>
            Region affects carrier_region and sys_region in the feed. Store region is set
            server-side. Use a VPN to change your IP address separately.
          </Text>
        </Box>
      </Box>
    );
  });
};
