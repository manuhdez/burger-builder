import React from 'react';
import { configure, shallow } from 'enzyme';
// Components needed
import { Checkout } from './checkout';
import { Redirect, Route } from 'react-router-dom';
import CheckoutSummary from '../../components/order/checkoutSummary/checkoutSummary';
// Enzyme configuration
import Adapter from 'enzyme-adapter-react-16';
configure({adapter: new Adapter()});

describe('<Checkout /> container', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<Checkout history={{}} purchased={false} />);
    });

    
    it('should redirect to the homepage if there are not ingredients selected', () => {
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it('should redirect to the homepage if props.purchased is true', () => {
        wrapper.setProps({purchased: true});
        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it('should render the <CheckoutSummary /> component if there are ingredients selected', () => {
        const ings = [
            {name: 'salad', amount: 1},
            {name: 'bacon', amount: 1},
            {name: 'cheese', amount: 1},
            {name: 'meat', amount: 1}
        ];

        wrapper.setProps({ings, match: {url: ''}});
        expect(wrapper.find(CheckoutSummary)).toHaveLength(1);
        expect(wrapper.find(Route)).toHaveLength(1);
    });
});