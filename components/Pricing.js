import React, { useState } from 'react';
import Link from 'next/link';

const pricingPlans = {
  monthly: [
    {
      name: 'Basic Plan',
      price: '29',
      features: [
        'Web Development',
        'Digital Marketing',
        '24/7 Support',
        'Mobile Friendly Design',
        'Unlimited Revisions',
      ],
      recommended: false
    },
    {
      name: 'Standard Plan',
      price: '49',
      features: [
        'Web Development',
        'Digital Marketing',
        '24/7 Support',
        'Mobile Friendly Design',
        'Unlimited Revisions',
        'SEO Optimization',
        'E-commerce Integration'
      ],
      recommended: true
    },
    {
      name: 'Premium Plan',
      price: '99',
      features: [
        'Web Development',
        'Digital Marketing',
        '24/7 Support',
        'Mobile Friendly Design',
        'Unlimited Revisions',
        'SEO Optimization',
        'E-commerce Integration',
        'Custom Features',
        'Priority Support'
      ],
      recommended: false
    }
  ],
  yearly: [
    {
      name: 'Basic Plan',
      price: '299',
      features: [
        'Web Development',
        'Digital Marketing',
        '24/7 Support',
        'Mobile Friendly Design',
        'Unlimited Revisions',
      ],
      recommended: false
    },
    {
      name: 'Standard Plan',
      price: '499',
      features: [
        'Web Development',
        'Digital Marketing',
        '24/7 Support',
        'Mobile Friendly Design',
        'Unlimited Revisions',
        'SEO Optimization',
        'E-commerce Integration'
      ],
      recommended: true
    },
    {
      name: 'Premium Plan',
      price: '999',
      features: [
        'Web Development',
        'Digital Marketing',
        '24/7 Support',
        'Mobile Friendly Design',
        'Unlimited Revisions',
        'SEO Optimization',
        'E-commerce Integration',
        'Custom Features',
        'Priority Support'
      ],
      recommended: false
    }
  ]
};

export const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  return (
    <section id="pricing" className="pricing-area pt-130 rpt-100 pb-100 rpb-70 rel z-1">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="section-title text-center mb-60 wow fadeInUp delay-0-2s">
              <span className="sub-title mb-15">Pricing Package</span>
              <h2>Choose Your Best Plan</h2>
            </div>
          </div>
        </div>
        <div className="pricing-tab-active mb-60">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
              <div className="pricing-tab-switcher">
                <span className={billingPeriod === 'monthly' ? 'active' : ''}>Monthly</span>
                <button 
                  className="switcher" 
                  onClick={() => setBillingPeriod(prev => prev === 'monthly' ? 'yearly' : 'monthly')}
                >
                  <span className="slider"></span>
                </button>
                <span className={billingPeriod === 'yearly' ? 'active' : ''}>Yearly</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {pricingPlans[billingPeriod].map((plan, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className={`pricing-item ${plan.recommended ? 'recommended' : ''} wow fadeInUp delay-0-2s`}>
                {plan.recommended && <span className="badge">Recommended</span>}
                <div className="pricing-header">
                  <h4 className="title">{plan.name}</h4>
                  <span className="price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="duration">/{billingPeriod === 'monthly' ? 'month' : 'year'}</span>
                  </span>
                </div>
                <div className="pricing-features">
                  <ul>
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <i className="fas fa-check"></i> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pricing-btn">
                  <Link href="/contact" className="theme-btn">
                    Choose Package <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;