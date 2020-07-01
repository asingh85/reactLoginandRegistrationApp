import React from 'react';
import Enzyme ,{ mount,shallow, render ,configure } from 'enzyme';
import SignupForm from './index';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() }); 

describe('Test case for testing SignUp Form', () => {
    test('sign up check', () => {
        const result = mount(<SignupForm/>);
        expect(result.find('button').text()).toEqual("Sign UP");
        expect(result.state('userName')).toBe("");
        expect(result.state('firstName')).toBe("");
        expect(result.state('lastName')).toBe("");
        expect(result.state('gender')).toBe("");
        expect(result.state('country')).toBe("");
        expect(result.state('email')).toBe("");
        expect(result.state('password')).toBe("");
        expect(result.state('confirmPassword')).toBe("");
   })
   // Though, all the fields can be tested by similarly I did in  Sign In form.
});