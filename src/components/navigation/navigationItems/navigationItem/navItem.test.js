import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Import components to test
import NavItem from './navItem';
import { NavLink } from 'react-router-dom';

// connect enzyme with react
configure({adapter: new Adapter()});

describe('<NavItem/>', () => {
    it('should pass its children to the Navlink component', () => {
        const wrapper = shallow(<NavItem>Burger Builder</NavItem>);
        expect(wrapper.find(NavLink).children()).toHaveLength(1);
    });
});