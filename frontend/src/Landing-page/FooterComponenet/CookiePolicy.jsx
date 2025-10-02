import React from "react";
import "./PolicyPages.css";

export default function CookiePolicy() {
  return (
    <div className="policy-container">
      <h1>Cookie Policy</h1>
      <p className="updated">Last updated: September 26, 2025</p>

      <section>
        <h2>Introduction</h2>
        <p>
          This Cookie Policy explains how we use cookies and similar
          technologies on our website and digital services. By continuing to
          browse or use our site, you agree to the placement and use of cookies
          as described here. Cookies help us deliver an efficient, secure, and
          personalized experience for every visitor.
        </p>
      </section>

      <section>
        <h2>What Are Cookies?</h2>
        <p>
          Cookies are small text files that are stored on your computer, tablet,
          or mobile device when you visit a website. They contain information
          that is transferred to your device’s hard drive and can be retrieved
          by the originating site or other websites that recognize the cookie.
          Cookies do not typically contain personally identifiable information
          but can be linked to data we store about you.
        </p>
      </section>

      <section>
        <h2>Why We Use Cookies</h2>
        <p>
          We use cookies for a variety of reasons that enhance both functionality
          and security. Some cookies are strictly necessary to make our site
          work, while others help us improve performance, analyze usage, and
          offer personalized content and marketing. Specific purposes include:
        </p>
        <ul>
          <li>Authenticating users and maintaining secure login sessions.</li>
          <li>Remembering your preferences such as language, location, or theme.</li>
          <li>
            Measuring site traffic, page popularity, and user flows to improve
            performance.
          </li>
          <li>
            Delivering customized content, product recommendations, and targeted
            offers relevant to your interests.
          </li>
          <li>Detecting and preventing fraud or suspicious activities.</li>
          <li>
            Enabling features like live chat, customer support tools, and
            embedded videos.
          </li>
        </ul>
      </section>

      <section>
        <h2>Types of Cookies We Use</h2>
        <p>
          Different cookies serve different purposes. We categorize them as
          follows:
        </p>
        <ul>
          <li>
            <strong>Essential Cookies:</strong> Required for the website to
            function correctly—such as those that keep you logged in and enable
            secure transactions.
          </li>
          <li>
            <strong>Performance & Analytics Cookies:</strong> Collect
            information about how visitors use our site (e.g., Google Analytics)
            so we can measure and enhance performance.
          </li>
          <li>
            <strong>Functionality Cookies:</strong> Remember your preferences
            and choices to provide a more personalized experience.
          </li>
          <li>
            <strong>Advertising & Targeting Cookies:</strong> Track browsing
            habits across websites to deliver relevant advertising and limit how
            often you see an ad.
          </li>
          <li>
            <strong>Session Cookies:</strong> Temporary cookies that expire when
            you close your browser.
          </li>
          <li>
            <strong>Persistent Cookies:</strong> Remain on your device for a set
            period or until you manually delete them.
          </li>
        </ul>
      </section>

      <section>
        <h2>First-Party and Third-Party Cookies</h2>
        <p>
          Cookies set by our own website are called first-party cookies.
          Third-party cookies are set by external service providers that assist
          us with analytics, advertising, or embedded services such as payment
          gateways and video players. These third-party providers are required
          to protect the information they collect, but their use is governed by
          their own privacy policies.
        </p>
      </section>

      <section>
        <h2>Managing and Controlling Cookies</h2>
        <p>
          You have the right to decide whether to accept or reject cookies.
          While most browsers automatically accept cookies, you can modify your
          browser settings to decline them or to alert you when a cookie is
          being placed. Keep in mind that disabling essential cookies may affect
          site functionality, including secure areas and shopping features.
        </p>
        <ul>
          <li>
            Check your browser’s support pages for instructions on adjusting
            cookie settings.
          </li>
          <li>
            Use privacy-focused browser extensions or tools to block or manage
            trackers.
          </li>
          <li>
            Opt out of interest-based advertising through industry tools such as{" "}
            <a
              href="https://optout.aboutads.info"
              target="_blank"
              rel="noopener noreferrer"
            >
              the DAA opt-out page
            </a>{" "}
            or{" "}
            <a
              href="https://youradchoices.ca"
              target="_blank"
              rel="noopener noreferrer"
            >
              YourAdChoices
            </a>.
          </li>
        </ul>
      </section>

      <section>
        <h2>Data Collected Through Cookies</h2>
        <p>
          Information gathered through cookies may include browser type, device
          model, operating system, pages visited, time spent on pages, referring
          URLs, and general location data such as city or region. We do not
          attempt to identify you personally from this data without your
          consent.
        </p>
      </section>

      <section>
        <h2>Security and Privacy</h2>
        <p>
          We implement industry-standard security measures to protect cookie
          data. Cookies themselves cannot run programs or transmit malware.
          However, to maintain the highest level of security, we recommend
          keeping your browser updated and using secure networks when accessing
          our site.
        </p>
      </section>

      <section>
        <h2>Changes to This Cookie Policy</h2>
        <p>
          We may revise this Cookie Policy to reflect updates in technology,
          legal requirements, or our own practices. All changes will be posted
          here with a new “Last updated” date. Your continued use of our
          services after any changes constitutes acceptance of the revised
          policy.
        </p>
      </section>

      <section>
        <h2>Contact Us</h2>
        <p>
          If you have any questions or concerns about how we use cookies or how
          your information is handled, please contact us at{" "}
          <a href="mailto:privacy@example.com">privacy@example.com</a>. We will
          respond promptly to your inquiry.
        </p>
      </section>
    </div>
  );
}
