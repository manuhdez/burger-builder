import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Import components to test
import NavItem from './navItem';
import { NavLink } from 'react-router-dom';

// connect enzyme with react
configure({adapter: new Adapter()});

describe('<NavItem/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavItem>Burger Builder</NavItem>);
    });

    it('should pass its children to the Navlink component', () => {
        wrapper.setProps({link: '/'})
        expect(wrapper.find(NavLink).children()).toHaveLength(1);
    });
});