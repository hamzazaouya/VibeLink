import React from 'react';
import { UserFormProps } from '../types/registration.types';
import PhoneInput from 'react-phone-number-input'

const UserForm = (props: UserFormProps) => {

  return (
    <div className="user_form">
        <form className="form">
            <div>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={props.firstName}
                onChange={e => props.updateFields({firstName: e.target.value})}
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={props.lastName}
                onChange={e => props.updateFields({lastName: e.target.value})}
                required
              />
            </div>
            <div>
              <input
                type="number"
                name="age"
                placeholder="Age"
                onChange={e => props.updateFields({ age: e.target.value })}
                min="18"
                max="100"
                value={props.age}
                required
              />
            </div>
            <div>
              <select
              id="gender"
              name="gender"
              value={props.gender}
              onChange={e => props.updateFields({ gender: e.target.value })}
              required >
              <option value="">Select gender</option>
              <option value="male">♂ Male</option>
              <option value="female">♀ Female</option>
              </select>
            </div>
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={props.phone}
                onChange={e => props.updateFields({ phone: e.target.value })}
                placeholder="Phone number"
                required
                pattern="^\+?\d{10,15}$"
              />
            </div>
            <div>
              <textarea 
                id="bio"
                name="bio"
                value={props.bio}
                onChange={e => props.updateFields({ bio: e.target.value })}
                rows={4}
                cols={40}
                placeholder="Tell us about yourself..."
                maxLength={1000}
                required />
            </div>
          </form>
    </div>
  );
};

export default UserForm;
