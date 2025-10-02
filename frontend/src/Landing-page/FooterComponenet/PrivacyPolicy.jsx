import React from "react";
import "./PolicyPages.css";

export default function PrivacyPolicy() {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: September 26, 2025</p>

      <section>
        <h2>Overview</h2>
        <p>
          This Privacy Policy describes how we collect, use, disclose, and
          safeguard your information when you visit our website or use any of
          our services. Protecting your privacy and data is at the core of our
          values. Please read this policy carefully to understand our views and
          practices regarding your personal data and how we will treat it.
        </p>
      </section>

      <section>
        <h2>Information We Collect</h2>
        <p>
          We collect both information that identifies you directly and data that
          does not identify you personally but may be linked to your usage
          patterns. Examples include:
        </p>
        <ul>
          <li>
            <strong>Personal details:</strong> name, email address, billing and
            shipping addresses, phone number, and payment details when you sign
            up or complete transactions.
          </li>
          <li>
            <strong>Technical data:</strong> IP address, browser type and
            version, operating system, device identifiers, and referral URLs.
          </li>
          <li>
            <strong>Usage data:</strong> pages you visit, features you use,
            search queries, and time spent on the site.
          </li>
          <li>
            <strong>Optional data:</strong> information you choose to provide,
            such as feedback, survey responses, or support messages.
          </li>
        </ul>
      </section>

      <section>
        <h2>How We Use Your Information</h2>
        <p>
          We use collected data for legitimate business interests, including but
          not limited to:
        </p>
        <ul>
          <li>Providing and personalizing our services and website experience.</li>
          <li>Processing payments and completing transactions securely.</li>
          <li>Sending service-related notifications, updates, and invoices.</li>
          <li>
            Improving website performance, troubleshooting issues, and analyzing
            user behavior for better functionality.
          </li>
          <li>
            Communicating offers, promotions, or new features you might find
            valuable—only if you have opted in to marketing emails.
          </li>
          <li>
            Complying with legal obligations, resolving disputes, and enforcing
            agreements.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies and Tracking</h2>
        <p>
          We use cookies, beacons, and similar technologies to collect
          statistical information about user interactions, remember your
          preferences, and deliver a more seamless browsing experience. For full
          details, please review our separate Cookie Policy.
        </p>
      </section>

      <section>
        <h2>Sharing of Data</h2>
        <p>
          We respect your privacy and only share data in limited situations:
        </p>
        <ul>
          <li>
            With trusted service providers who perform functions such as payment
            processing, analytics, cloud hosting, and customer support—under
            strict confidentiality agreements.
          </li>
          <li>
            When required by law or to protect our legal rights, property, or
            safety of our users and the public.
          </li>
          <li>
            In connection with a merger, acquisition, or sale of assets, where
            user information may be transferred as part of the business assets.
          </li>
        </ul>
      </section>

      <section>
        <h2>International Data Transfers</h2>
        <p>
          If you access our services from outside our primary operating country,
          be aware that your information may be transferred, stored, and
          processed in countries where privacy laws may not be as protective.
          We take reasonable steps to safeguard your data in such cases.
        </p>
      </section>

      <section>
        <h2>Security Measures</h2>
        <p>
          We use industry-standard encryption, secure servers, and regular
          security audits to protect your personal data. Despite these efforts,
          no electronic transmission or storage system can be guaranteed 100%
          secure. Please keep your account credentials confidential.
        </p>
      </section>

      <section>
        <h2>Your Rights</h2>
        <p>
          Depending on your jurisdiction, you may have rights to access,
          correct, delete, or restrict the use of your personal information. You
          may also request a copy of the data we hold or withdraw your consent
          for certain uses at any time by contacting us.
        </p>
      </section>

      <section>
        <h2>Data Retention</h2>
        <p>
          We retain personal data only for as long as necessary to provide our
          services, comply with legal obligations, resolve disputes, and enforce
          agreements. When no longer needed, we securely delete or anonymize
          data.
        </p>
      </section>

      <section>
        <h2>Policy Updates</h2>
        <p>
          We may revise this Privacy Policy periodically to reflect changes in
          our practices, technology, or legal requirements. Any modifications
          will be posted on this page with an updated date. Continued use of the
          website after changes constitutes acceptance.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have questions, concerns, or complaints regarding our privacy
          practices, please reach out at{" "}
          <a href="mailto:privacy@example.com">privacy@example.com</a>.
        </p>
      </section>
    </div>
  );
}
