import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BaseLayout from '../layouts/base';
import TransactionStatus from '../components/TransactionStatus';
import Form from '../components/Form';
import Input from '../components/Input';
import Button from '../components/Button';
import { transferSubmitTransaction } from '../reducers/_tokenize';

const StyledForm = styled(Form)`
  width: 100%;
  max-width: 600px;
  display: flex;
  margin: 30px auto;
`;

const StyledButton = styled(Button)`
  width: 100px;
  height: 44px;
  margin-top: 8px;
  margin-left: 8px;
`;
const StyledSubHeader = styled.div`
  display: flex;
  margin: 30px auto;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 600px;
  height: 125px;
`;

const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  height: 100%;
`;

const StyledTransactionList = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const StyledTransaction = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 60px auto;
  font-size: 28px;
  & p {
    width: 100%;
    text-align: center;
  }
`;

class TransferDomain extends Component {
  render = () => {
    const { domain, labelHash } = this.props;
    return (
      <BaseLayout>
        <StyledWrapper>
          <h3>{`Transfer domain ${domain || labelHash} to:`}</h3>
          <StyledSubHeader>
            <StyledForm
              onSubmit={() =>
                this.props.tokenizeSubmitTransaction(this.props.domain)
              }
            >
              <Input
                label=""
                placeholder="ensdomain.eth"
                type="text"
                value={this.props.domain}
                onChange={({ target }) =>
                  this.props.tokenizeUpdateDomain(target.value)
                }
              />
              <StyledButton type="submit">Submit</StyledButton>
            </StyledForm>
          </StyledSubHeader>
          <StyledTransactionList>
            <StyledTransaction>
              <TransactionStatus status={this.props.burnTokenStatus} />
              <p>Transfer ENS Domain token</p>
            </StyledTransaction>
          </StyledTransactionList>
        </StyledWrapper>
      </BaseLayout>
    );
  };
}

const reduxProps = ({ tokenize }) => ({
  labelHash: tokenize.labelHash,
  domain: tokenize.domain,
  burnTokenStatus: tokenize.burnTokenStatus
});

export default connect(
  reduxProps,
  { transferSubmitTransaction }
)(TransferDomain);