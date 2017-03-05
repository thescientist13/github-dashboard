import Footer from './footer';

test('Footer interface', () => {
  it('renders without crashing', () => {
    const div = document.createElement('section');
    ReactDOM.render(<Footer/>, div);
  });
});