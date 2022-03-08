import React, { Component } from 'react';
import propTypes from 'prop-types';
import { createUser } from './services/userAPI';
import Loading from './loading';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoginBtnDisable: true,
      isLoading: false,
    };

    this.verifyLength = this.verifyLength.bind(this);
    this.enviarNome = this.enviarNome.bind(this);
  }

  verifyLength({ target }) {
    const minLength = 3;
    const { length } = target.value;
    if (length >= minLength) {
      this.setState({ isLoginBtnDisable: false });
    } else {
      this.setState({ isLoginBtnDisable: true });
    }
  }

  enviarNome({ target }) {
    const loginName = target.parentElement.children[0].value;
    this.setState({ isLoading: true }, () => createUser({ name: loginName }));
    const { logado } = this.props;
    this.setState({ logado: true });
    console.log(logado);
  }

  render() {
    const { isLoginBtnDisable, isLoading } = this.state;
    return (
      isLoading ? <Loading />
        : (
          <div>
            <input
              type="text"
              onChange={ this.verifyLength }
              data-testid="login-name-input"
            />
            <button
              type="submit"
              disabled={ isLoginBtnDisable }
              onClick={ this.enviarNome }
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </div>
        )
    );
  }
}

Login.propTypes = {
  logado: propTypes.bool.isRequired,
};

export default Login;
