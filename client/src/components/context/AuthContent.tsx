import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert } from 'antd';
import axios from 'axios';
import { User } from '../../models/user';

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
  isTestMode?: boolean;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, isTestMode = false }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isTestMode);
  //테스트 모드에 따른 더미 데이터
  const [user, setUser] = useState<User | null>(isTestMode ? { username: 'testUser', currEgg: 1, contains: [1, 2, 3, 4] } : null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>();

  // 로그인 상태 확인
  const checkAuhtStatus = async () => {
    if (isTestMode) return;
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/status`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200 && response.data.username) {
        setIsLoggedIn(true);
        setUser({ username: response.data.username, currEgg: response.data.currEgg, contains: response.data.contains });
        setAlertMessage('로그인에 성공했습니다.');
        setAlertType('success');
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      setIsLoggedIn(false);
      setUser(null);
      setAlertMessage('로그인에 실패했습니다.');
      setAlertType('error');
    }
  };

  useEffect(() => {
    checkAuhtStatus();
  });

  const login = (username: string) => {
    setUser({ username, currEgg: 1, contains: [1, 2, 3, 4] });
    setIsLoggedIn(true);
    setAlertMessage('로그인에 성공했습니다.');
    setAlertType('success');
  };

  //로그인 실패시 alert
  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login }}>
      {alertMessage && <Alert message={alertMessage} type={alertType} closable showIcon />}
      {children}
    </AuthContext.Provider>
  );
};
