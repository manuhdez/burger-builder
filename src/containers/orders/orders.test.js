import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// components
import { Orders } from './orders';
import Order from '../../components/order/order';
import Spinner from '../../components/UI/spinner/spinner';

configure({adapter: new Adapter()});


describe('<Orders />', () => {
    let wrapper = null;
    beforeEach(() => {
        wrapper = shallow(<Orders onFetchOrders={() => {}} orders={[]} />);
    });
    
    it('should render a <Spinner/> while loading orders from the server', () => {
        wrapper.setProps({loading: true});
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should render orders correctly from props.orders as <Order/> components', () => {
        const mockedOrder = {
            ingredients: [
                {name: 'Salad', amount: 1},
                {name: 'Bacon', amount: 1},
                {name: 'Cheese', amount: 2},
                {name: 'Meat', amount: 1},
            ],
            price: 6,
            id: 'order-id'
        };

        const expectedOutput = (
            <div>
                <Order key="order-id" ingredients={mockedOrder.ingredients} price={mockedOrder.price} />
            </div>
        );

        wrapper.setProps({orders: [mockedOrder]});
        expect(wrapper.contains(expectedOutput)).toBe(true);
    });
});
