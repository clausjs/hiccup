import React, { FC, useState } from 'react'
import { Section } from 'components/common/Section'
import { FeaturedCard, AddFeaturedCard } from './FeaturedCard'
import styles from './index.module.css'
import { FeaturedEntity } from 'modules/config/types'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const FeaturedSection: FC<{ featured: FeaturedEntity[] }> = ({ featured }) => {
  const [ startIndex, setStartIndex ] = useState<number>(0);

  const getCards = () => {
    const cards = [];
    for (let i = startIndex; i < featured.length; i++) {
      if (cards.length + 1 <= 4) cards.push(featured[i]);
      else break;
    }
    if (cards.length < 4) {
      for (let i = featured.length; i >= 0; i--) {
        cards.push(featured[i]);
      }
    }
    return cards;
  }

  const changePage = (direction: 'left' | 'right', e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    switch (direction) {
      case 'left':
        setStartIndex(startIndex - 1 > 0 ? startIndex - 1 : featured.length - 4);
        break;
      case 'right':
        setStartIndex(startIndex + 1 > featured.length - 4 ? 0 : startIndex + 1);
        break;
      default:
        break;
    }
  }

  const cards = getCards();

  return (
    <Section className={styles.featured} data-testid="featured-section">
      {featured &&
        cards.map((link, index) => (
          <FeaturedCard key={index} index={index} link={link}>
            {index === 0 && <FaAngleLeft className={styles.pageLeft} onClick={(e) => changePage('left', e)} />}
            {index === 3 && <FaAngleRight className={styles.pageRight} onClick={(e) => changePage('right', e)} />}
          </FeaturedCard>
        ))}
      {featured && featured.length < 4 && <AddFeaturedCard />}
    </Section>
  );
}

export { FeaturedSection, FeaturedSection as default }
