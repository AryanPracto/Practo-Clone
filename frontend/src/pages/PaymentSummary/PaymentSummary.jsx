import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const PaymentSummary = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <div>
      <h2>Payment Summary</h2>
      <p>Clinic: {searchParams.get('clinic')}</p>
      <p>Time: {searchParams.get('time')}</p>
      <p>Fee: {searchParams.get('fee')}</p>
    </div>
  );
};

export default PaymentSummary;