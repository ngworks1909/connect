"use client"
import { UserState } from '@/atoms/UserState'
import { ChangeEvent } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Eye, EyeOff, Phone, User, Mail, Lock } from 'lucide-react'
import { PasswordState } from '@/atoms/PasswordState'

type PropTypes = {
    type: string,
    name: string,
    placeholder: string,
    label: string,
}

const getIcon = (name: string) => {
  if (name === "username") return <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />;
  if (name === "email") return <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />;
  if (name === "mobile") return <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />;
  return <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />;
};

const getInputType = (name: string, type: string, showPassword: boolean) => {
  if (name !== "password") return type;
  return showPassword ? "text" : "password";
};

export default function Field({type, placeholder, name, label}: Readonly<PropTypes>) {
  const setUser = useSetRecoilState(UserState);
  const showPassword = useRecoilValue(PasswordState);
  const setShowPassword = useSetRecoilState(PasswordState)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let val = e.target.value;
    setUser(prevUser => ({...prevUser, [name]:val}));
  }
  return (
    <div className="space-y-2">
        <Label htmlFor={name}>{label}</Label>
        <div className="relative">
          {getIcon(name)}
          <Input
            id={name}
            placeholder={placeholder}
            type={getInputType(name, type, showPassword)}
            onChange={handleChange}
            className="pl-10"
            required
          />
          {
            name === "password" && <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </button>
          }
        </div>
    </div>
  )
}