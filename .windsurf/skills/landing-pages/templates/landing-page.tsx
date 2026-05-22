export default function LandingPage() {
  return (
    <div>
      <section className="hero">
        <h1>Transform Your Business</h1>
        <p>Get started today with our platform</p>
        <CTAButton href="/signup">Get Started</CTAButton>
      </section>
      <section className="features">
        <FeatureCard title="Feature 1" description="Description" />
        <FeatureCard title="Feature 2" description="Description" />
      </section>
    </div>
  )
}
