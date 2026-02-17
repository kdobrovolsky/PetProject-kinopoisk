import s from './RatingRange.module.css';
import { Slider } from '@mui/material';

type Props = {
  minRating: string;
  maxRating: string;
  onRatingChange: (min: string, max: string) => void;
};

export const RatingRange = ({ minRating, maxRating, onRatingChange }: Props) => {
  return (
    <div className={s.filterGroup}>
      <div className={s.filterTitle}>Rating</div>
      <div className={s.ratingValue}>
        {minRating} – {maxRating}
      </div>
      <Slider
        value={[Number(minRating), Number(maxRating)]}
        onChange={(_e, newValue) => {
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

