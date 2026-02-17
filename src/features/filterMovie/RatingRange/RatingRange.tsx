import s from './RatingRange.module.css';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';

type Props = {
  minRating: string;
  maxRating: string;
  onRatingChange: (min: string, max: string) => void;
};

export const RatingRange = ({ minRating, maxRating, onRatingChange }: Props) => {
  const [range, setRange] = useState<[number, number]>([Number(minRating), Number(maxRating)]);

  useEffect(() => {
    setRange([Number(minRating), Number(maxRating)]);
  }, [minRating, maxRating]);

  return (
    <div className={s.filterGroup}>
      <div className={s.filterTitle}>Rating</div>
      <div className={s.ratingValue}>
        {range[0]} - {range[1]}
      </div>
      <Slider
        value={range}
        onChange={(_e, newValue) => {
          const [min, max] = newValue as number[];
          setRange([min, max]);
        }}
        onChangeCommitted={(_e, newValue) => {
          const [min, max] = newValue as number[];
          onRatingChange(min.toString(), max.toString());
        }}
        min={0}
        max={10}
        step={0.1}
        valueLabelDisplay='auto'
        sx={{ maxWidth: 300 }}
      />
    </div>
  );
};
