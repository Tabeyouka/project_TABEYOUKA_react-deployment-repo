import { Review } from '../../types/review.interface';

import { Avatar, Box, Button, Divider, Rating, SxProps, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import moment from 'moment';
import { checkLikeReview, toggleLikeReview } from '../../services/review.service';
import { useLayoutEffect, useState } from 'react';
import { EditorOnlyRead } from '../common/CKEditor';
import RestaurantBanner from './RestaurantBanner';
import { useNavigate } from 'react-router-dom';

const reviewItemStyle: SxProps = {
  width: '650px',
  pt: '15px',
  pb: '20px',

  // mobile interactive design
  '@media (max-width: 840px)': {
    width: '100%',
  },
};

// FIXME: test용 데이터
const userInfo = {
  id: '',
};

const ReviewItem = ({ review }: { review: Review }) => {
  const navigate = useNavigate();
  const [alreadyLiked, setAlreadyLiked] = useState<boolean>(review.liked ? true : false);
  const [encourage, setEncourage] = useState<boolean>(false);

  const redirectToRestaurant = () => {
    navigate(`/store?id=${review.restaurant.id}`);
  };

  const handleLike = () => {
    if (!userInfo.id) {
      return setEncourage(true);
    }

    toggleLikeReview(review.id, userInfo?.id);
    setAlreadyLiked((p) => !p);
  };

  return (
    <Box sx={reviewItemStyle}>
      {/* review header */}
      <Box border="1px solid rgba(0, 0, 0, 0.1)">
        {/* review header */}
        <Box pl="8px">
          <Box
            display="flex"
            alignItems="center"
            gap="1rem"
            m={2}
            sx={{
              '@media (max-width: 840px)': {
                flexWrap: 'wrap',
              },
            }}
          >
            <Avatar src={review.user.profile_image} />
            <Box>
              <Typography fontWeight={600}>{review.user.nickname}</Typography>
              <Box display="flex">
                {/* TODO: 나중에 갯수 계산하는 것도 추가해야함(백엔드 측), */}
                <Typography>口コミ 1000件</Typography>
                <Box width="1rem" />
                <Typography>フォロワー {review.user.follower}</Typography>
              </Box>
            </Box>
            <Typography
              marginTop="auto"
              marginLeft="auto"
              fontSize="14px"
              marginRight="1rem"
              fontStyle="italic"
            >
              {review.user.bio}
            </Typography>
          </Box>
        </Box>

        <Divider variant="middle" />

        {/* review information */}
        <Box pl="8px">
          <Box display="flex" alignItems="center" gap="1rem" m={2}>
            <Rating
              name="rating"
              value={review.score}
              readOnly
              sx={{
                '@media (max-width: 480px)': {
                  fontSize: '1rem',
                },
              }}
            />
            <span>{review.score}</span>
            <Typography marginTop="auto" marginLeft="auto" fontSize="14px" marginRight="1rem">
              {moment(review.created_at).format('YYYY-MM-DD')}
            </Typography>
          </Box>
        </Box>

        <Divider variant="middle" />

        {/* review content */}
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          m={2}
          fontFamily="Apple SD Gothic Neo, Noto Sans, Helvetica, Arial, Tahoma, Verdana, Sans-Serif"
        >
          <Box width="100%">
            <EditorOnlyRead data={review.content} />
            <Box height="1rem" />
            <Box display="flex" flexWrap="wrap" gap={1}>
              {review.images.map((image, idx) => {
                return (
                  <img
                    key={idx}
                    src={image}
                    alt="review"
                    style={{ width: '125px', maxWidth: '100%' }}
                  />
                );
              })}
            </Box>
          </Box>
        </Box>

        <Divider variant="middle" />

        <Box m={2} sx={{ cursor: 'pointer' }}>
          <div onClick={redirectToRestaurant}>
            <RestaurantBanner data={review.restaurant} size="small" />
          </div>
        </Box>

        <Divider variant="middle" />

        {/* footer */}
        <Box m={2} display="flex" alignItems="center" gap={2}>
          <Button
            size="small"
            variant={alreadyLiked ? 'outlined' : 'contained'}
            color="warning"
            onClick={handleLike}
          >
            <FavoriteBorderIcon />
            <Box width="0.5rem" />
            <Typography>{alreadyLiked ? '取り消し' : 'いいね！'}</Typography>
            <Typography
              marginLeft="1rem"
              fontSize={13}
              fontWeight={400}
              alignItems="center"
              display="flex"
            >
              {review.like}
            </Typography>
          </Button>
          {encourage && (
            <Typography fontSize="small" fontWeight={200}>
              いいね！するには &nbsp;
              <u
                style={{ color: 'blue', cursor: 'pointer', fontWeight: 600 }}
                onClick={() => navigate('login')}
              >
                ログイン
              </u>
              &nbsp; してください
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewItem;
