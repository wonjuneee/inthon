import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alert } from 'antd';
import axios from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext) as AuthContextType;

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<'success' | 'error'>();

  // 로그인 상태 확인
  const checkAuhtStatus = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/status`, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUsername(response.data.username);
        setAlertMessage('로그인에 성공했습니다.');
        setAlertType('success');
      }
    } catch (error) {
      console.error('인증 상태 확인 실패:', error);
      setIsLoggedIn(false);
      setUsername(null);
      setAlertMessage('로그인에 실패했습니다.');
      setAlertType('error');
    }
  };

  useEffect(() => {
    checkAuhtStatus();
  });

  const login = (username: string) => {
    setUsername(username);
    setIsLoggedIn(true);
    setAlertMessage('로그인에 성공했습니다.');
    setAlertType('success');
  };

  //로그인 실패시 alert
  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login }}>
      {alertMessage && <Alert message={alertMessage} type={alertType} closable showIcon />}
      {children}
    </AuthContext.Provider>
  );
};
