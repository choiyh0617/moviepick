import styled from 'styled-components';
import { Button, Card, Section, SectionTitle } from '../../components/styled/CommonStyles';

export const SettingsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const SettingsSection = styled(Section)`
  margin-bottom: 40px;
`;

export const SettingItem = styled(Card)`
  padding: 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SettingInfo = styled.div`
  flex: 1;
`;

export const SettingTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-bottom: 8px;
`;

export const SettingDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  margin: 0;
`;

export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.primary};
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

export const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }) => theme.border};
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

export const DangerZone = styled.div`
  border: 2px solid ${({ theme }) => theme.error};
  border-radius: 12px;
  padding: 24px;
  margin-top: 40px;
`;

export const DangerTitle = styled.h3`
  color: ${({ theme }) => theme.error};
  font-size: 1.3rem;
  margin-bottom: 16px;
`;

export const DangerDescription = styled.p`
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  opacity: 0.8;
`;

export const DangerButton = styled(Button)`
  background: ${({ theme }) => theme.error};
  color: white;
  border: none;

  &:hover {
    background: #ff3742;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 71, 87, 0.3);
  }
`; 