import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// Components
import { BurgerBuilder } from './burgerBuilder';
import BuildControls from '../../components/Burger/buildControls/buildControls';
import Spinner from '../../components/UI/spinner/spinner';

configure({adapter: new Adapter()});

describe('<BurgerBuilder/>', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />);
    });

    it('should render a spinner if there are no ingredients loaded', () => {
        wrapper.setProps({ings: null});
        expect(wrapper.find(Spinner)).toHaveLength(1);
    });

    it('should render the buildControls when ingredients are loaded', () => {
        wrapper.setProps({ings: true});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });

    it('should render a paragraph with an error message if props.error is set to true', () => {
        wrapper.setProps({error: true});
        expect(wrapper.contains(<p style={{textAlign: 'center'}}>Ingredients can't be loaded</p>)).toBe(true);
    });
    
});
