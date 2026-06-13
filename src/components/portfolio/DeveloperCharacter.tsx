export function DeveloperCharacter() {
  return (
    <div
      style={{
        animation: "character-float 4s ease-in-out infinite",
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <img
        src="/assets/avator-hero-section.png"
        alt="3D Developer Avatar"
        style={{
          width: "100%",
          height: "auto",
          maxWidth: 1000,
          objectFit: "contain",
          filter: "drop-shadow(0 20px 30px rgba(0, 0, 0, 0.55))",
        }}
      />
    </div>
  );
}
