import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavItems from './navItems';
import NavItem from './navigationItem/navItem';

configure({adapter: new Adapter()});

describe('<NavItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItems />);
    });


    it('should render two <NavItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });
    
    it('should render 3 <NavItem /> components if the user is authenticated', () => {
        wrapper.setProps({isUserAuth: true});
        expect(wrapper.find(NavItem)).toHaveLength(3);
    });

    it('should render the logout route if the user is authenticated', () => {
        wrapper.setProps({isUserAuth: true});
        expect(wrapper.contains(<NavItem link="/logout">Log out</NavItem>)).toEqual(true);
        expect(wrapper.contains(<NavItem link="/auth">Log in</NavItem>)).toEqual(false);
    });

    it('should render the auth route if the user is not authenticated', () => {
        wrapper.setProps({isUserAuth: false});
        expect(wrapper.contains(<NavItem link="/auth">Log in</NavItem>)).toEqual(true);
        expect(wrapper.contains(<NavItem link="/logout">Log out</NavItem>)).toEqual(false);
    });
});