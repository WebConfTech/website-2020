import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2.3125rem;
  font-weight: normal;
  color: var(--color-accent);
  margin: 1.25rem 0 0 0;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: var(--color-text);
  margin: 0.4375rem 0 0 0;
  line-height: 1.375rem;
  padding: 0 2rem;
`;

export const CheckoutTitle = ({ title, description }) => (
  <Container>
    <Title>{title}</Title>
    {description && (
      <Description>{description}</Description>
    )}
  </Container>
);

CheckoutTitle.defaultProps = {
  description: '',
};

CheckoutTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
