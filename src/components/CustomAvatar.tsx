import { Types } from "connectkit";

const MyCustomAvatar = ({ address, ensImage, ensName, size, radius }: Types.CustomAvatarProps) => {
  return (
    <div
      style={{
        overflow: "hidden",
        borderRadius: radius,
        height: size,
        width: size,
        background: "#d51015",
    }}
    >
      {ensImage && <img src={ensImage} alt={ensName ?? address} width="100%" height="100%" />}
    </div>
  );
};

export default MyCustomAvatar;