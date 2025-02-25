import { ActivityIndicator, View } from "react-native";
import {loadingSpinnerStyle} from "./styles";

const LargeLoadingSpinner: React.FC<{
  fullScreen?: boolean, 
  marginTop?: number, 
}> = ({
    fullScreen = true, 
    marginTop = 0, 
  }) => {
  return (
    <View style={{
      ...loadingSpinnerStyle.loaderContainer, 
      flex: fullScreen ? 1 : undefined,
       marginTop: fullScreen ? 0 : marginTop
       }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
  );
};

export default LargeLoadingSpinner