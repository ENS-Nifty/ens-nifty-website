import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import Link from "../components/Link";
import Wrapper from "../components/Wrapper";
import Column from "../components/Column";
import Notification from "../components/Notification";
import Blockie from "../components/Blockie";
import Icon from "../components/Icon";
import Warning from "../components/Warning";
import { ellipseAddress } from "../helpers/utilities";
import branding from "../assets/ens-nifty-branding.png";
import github from "../assets/github.svg";
import twitter from "../assets/twitter.svg";
import ethereum from "../assets/ethereum.svg";
import { accountClearState } from "../reducers/_account";
import { colors, fonts, transitions } from "../styles";

const StyledLayout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  text-align: center;
`;

const StyledContent = styled(Wrapper)`
  width: 100%;
  height: 100%;
  padding: 0 16px;
`;

const StyledHeader = styled.div`
  margin-top: -1px;
  margin-bottom: 1px;
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const StyledBrandingWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const StyledBranding = styled.div`
  width: 200px;
  height: 50px;
  background: url(${branding}) no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`;

const StyledAddress = styled.p`
  transition: ${transitions.base};
  font-weight: bold;
  margin: ${({ connected }) => (connected ? "-2px auto 0.7em" : "0")};
`;

const StyledDisconnect = styled.div`
  transition: ${transitions.button};
  font-size: 12px;
  font-family: monospace;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;

  opacity: ${({ connected }) => (connected ? 1 : 0)};
  visibility: ${({ connected }) => (connected ? "visible" : "hidden")};
  pointer-events: ${({ connected }) => (connected ? "auto" : "none")};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`;

const StyledFooter = styled.footer`
  width: 100%;
  margin: 0 auto;
  height: 80px;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
`;

const StyledLink = styled.a`
  transition: ${transitions.short};
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  & p {
    display: flex;
    align-items: center;
    padding-left: 0.5em;
    font-size: ${fonts.size.h6};
    color: rgb(${colors.white});
    font-weight: ${({ activeLink }) => (activeLink ? `700` : `500`)};
  }
  &:hover {
    opacity: 0.7;
  }
`;

const BaseLayout = ({
  children,
  accountType,
  accountAddress,
  accountClearState,
  network,
  online,
  modalOpen,
  ...props
}) => {
  return (
    <StyledLayout>
      <Column maxWidth={1000} spanHeight>
        <StyledHeader>
          <Link to="/">
            <StyledBrandingWrapper>
              <StyledBranding alt="ENS Nifty" />
            </StyledBrandingWrapper>
          </Link>
          {accountAddress && (
            <Link to="/domains">
              <StyledActiveAccount>
                <Blockie seed={accountAddress} />
                <StyledAddress connected={!!accountAddress}>
                  {ellipseAddress(accountAddress)}
                </StyledAddress>
                <StyledDisconnect
                  connected={!!accountAddress}
                  onClick={accountClearState}
                >
                  {"Disconnect"}
                </StyledDisconnect>
              </StyledActiveAccount>
            </Link>
          )}
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
        <StyledFooter {...props}>
          <StyledLink
            href="https://github.com/ens-nifty/"
            target="blank"
            rel="noreferrer noopener"
          >
            <Icon icon={github} />
            <p>{`Github`}</p>
          </StyledLink>
          <StyledLink
            href="https://twitter.com/ensnifty/"
            target="blank"
            rel="noreferrer noopener"
          >
            <Icon icon={twitter} />
            <p>{`Twitter`}</p>
          </StyledLink>
          <StyledLink
            href="https://etherscan.io/address/ensnifty.eth/#code"
            target="blank"
            rel="noreferrer noopener"
          >
            <Icon icon={ethereum} />
            <p>{`Contract`}</p>
          </StyledLink>
        </StyledFooter>
      </Column>
      <Notification />
      <Warning />
    </StyledLayout>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
  accountClearState: PropTypes.func.isRequired,
  accountType: PropTypes.string.isRequired,
  accountAddress: PropTypes.string.isRequired,
  network: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired
};

const reduxProps = ({ account, warning }) => ({
  accountType: account.type,
  accountAddress: account.address,
  nativeCurrency: account.nativeCurrency,
  network: account.network,
  online: warning.online
});

export default connect(
  reduxProps,
  { accountClearState }
)(BaseLayout);
