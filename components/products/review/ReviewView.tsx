import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text } from 'react-native';

import { styles } from './styles';

interface ReviewStarsProps {
  reviewData?: {
    count: string;
    rating: number;
  };
}

export default function ReviewView({ reviewData }: ReviewStarsProps) {
  if (
    !reviewData ||
    (reviewData?.count ?? '') === '' ||
    reviewData?.count === '0'
  ) {
    return <></>;
  }
  const fullStars = Math.floor(reviewData.rating);
  const hasHalfStar = reviewData.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View>
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, index) => (
          <Ionicons
            testID="full-star"
            key={`full-${index}`}
            name="star"
            size={20}
            color="#FFD700"
          />
        ))}
        {hasHalfStar && (
          <Ionicons
            testID="half-star"
            key="half"
            name="star-half"
            size={20}
            color="#FFD700"
          />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <Ionicons
            testID="empty-star"
            key={`empty-${index}`}
            name="star-outline"
            size={20}
            color="#FFD700"
          />
        ))}
        <Text style={styles.rating}>({reviewData.rating})</Text>
      </View>
      <Text style={styles.reviewCount}>
        {reviewData.count + ` review${reviewData.count === '1' ? '' : 's'}`}
      </Text>
    </View>
  );
}
