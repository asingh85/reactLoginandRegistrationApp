import React from 'react';
import Enzyme ,{ mount,shallow, render ,configure } from 'enzyme';
import SigninForm from './index';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() }); 

describe('Test case for testing Signin Form', () => {
    let wrapper;
    test('userName check', () => {
         const result = mount(<SigninForm/>);
         expect(result.find('button').text()).toEqual("Sign In");
         expect(result.state('password')).toBe("");
         expect(result.state('email')).toBe("");
    })
    it('email field check', () => {
        wrapper = shallow(<SigninForm/>);
        expect(wrapper.find('.email-class')).toHaveLength(1);
    })
    it('email field check', () => {
        wrapper = shallow(<SigninForm/>);
        expect(wrapper.find('#password-class')).toHaveLength(1);
    })
    it('email field empty value check', () => {
        wrapper = mount(<SigninForm/>);
        const input = wrapper.find('.email-class').at(0);
        expect(wrapper.find('.email-class').at(0).prop('value')).toEqual("")
    })
    it('email field value check', () => {
        wrapper = mount(<SigninForm/>);
        const input = wrapper.find('.email-class').at(0);
        input.getDOMNode().value = "amandeepsingh1@gmail.com"
        expect(input.getDOMNode().value).toEqual("amandeepsingh1@gmail.com")
    })
    it('password field empty value check', () => {
        wrapper = mount(<SigninForm/>);
        const input = wrapper.find('#password-class').at(0);
        expect(wrapper.find('#password-class').at(0).prop('value')).toEqual("")
    })
    it('password field value check', () => {
        wrapper = mount(<SigninForm/>);
        const input = wrapper.find('#password-class').at(0);
        input.getDOMNode().value = "123"
        expect(input.getDOMNode().value).toEqual("123")
    })
});