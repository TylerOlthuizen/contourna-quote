import logo from './assets/img/logo-small.svg';
import './App.css';
import { QuoteProvider } from './context/QuoteContext';
import { Quote } from './components/Quote/';

function App() {
  return (
    <div className="App">
      <nav>
        <div className="container">
          <div className="flex-container">
            <a className="logo" href="https://contourna.com">
              <img src={logo} alt="" />
            </a>
            <ul className="menu">
              <li className="nav-item">
                <a href="https://contourna.com#contact">Need help?</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <QuoteProvider>
        <Quote />
      </QuoteProvider>
      <footer>
        <div className="container flex-container">
          <div>
            <ul className="contact-socials">
              <li>
                <a href="mailto:info@contourna.com">info@contourna.com</a>
              </li>
              <li>
                <a href="tel:780-293-7101">780-293-7101</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="copyright">&copy; 2022 contourna.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
