import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Web3Connect from "web3connect";
import BaseLayout from "../layouts/base";
import Column from "../components/Column";
import { accountInit } from "../reducers/_account";

const StyledLanding = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledButtonContainer = styled(Column)`
  width: 200px;
  margin: 50px 0;
`;

class Home extends Component {
  render = () => (
    <BaseLayout>
      <StyledLanding>
        <h1>
          Tokenize your ENS domain
          <br />
          and trade it as an NFT
        </h1>
        <StyledButtonContainer>
          <Web3Connect.Button
            providerOptions={{
              portis: {
                id: process.env.REACT_APP_PORTIS_ID,
                network: "mainnet"
              },
              fortmatic: {
                key: process.env.REACT_APP_FORTMATIC_KEY
              }
            }}
            onConnect={provider => {
              this.props.accountInit(provider);
            }}
          />
        </StyledButtonContainer>
      </StyledLanding>
    </BaseLayout>
  );
}

Home.propTypes = {
  accountInit: PropTypes.func.isRequired
};

export default connect(
  null,
  {
    accountInit
  }
)(Home);
