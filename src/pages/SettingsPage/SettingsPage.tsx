import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import {
  SettingsContainer,
  SettingsSection,
  SettingItem,
  SettingInfo,
  SettingTitle,
  SettingDescription,
  ToggleSwitch,
  ToggleInput,
  ToggleSlider,
  DangerZone,
  DangerTitle,
  DangerDescription,
  DangerButton
} from './styles';
import { SectionTitle } from '../../components/styled/CommonStyles';

interface SettingsPageProps {
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ isDarkMode, setIsDarkMode }) => {
  const { handleClearFavorites, handleClearRecent, handleClearAllData } = useSettings();

  return (
    <SettingsContainer>
      <SectionTitle>설정</SectionTitle>
      
      <SettingsSection>
        <SettingItem>
          <SettingInfo>
            <SettingTitle>다크 모드</SettingTitle>
            <SettingDescription>
              어두운 테마로 전환하여 눈의 피로를 줄입니다.
            </SettingDescription>
          </SettingInfo>
          <ToggleSwitch>
            <ToggleInput
              type="checkbox"
              checked={isDarkMode}
              onChange={(e) => setIsDarkMode(e.target.checked)}
            />
            <ToggleSlider />
          </ToggleSwitch>
        </SettingItem>
      </SettingsSection>

      <DangerZone>
        <DangerTitle>데이터 관리</DangerTitle>
        <DangerDescription>
          로컬에 저장된 데이터를 관리할 수 있습니다. 삭제된 데이터는 복구할 수 없습니다.
        </DangerDescription>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <DangerButton onClick={handleClearFavorites}>
            찜한 영화 삭제
          </DangerButton>
          <DangerButton onClick={handleClearRecent}>
            최근 본 영화 삭제
          </DangerButton>
          <DangerButton onClick={handleClearAllData}>
            모든 데이터 삭제
          </DangerButton>
        </div>
      </DangerZone>
    </SettingsContainer>
  );
};

export default SettingsPage; 