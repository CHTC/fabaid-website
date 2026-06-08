import ExportedImage from 'next-image-export-optimizer';
import { Box, Typography, Paper } from '@mui/material';
import React from 'react';
import { Staff } from '@/utils/staff';
import getFabricTexture from "@/utils/getFabricTexture";

type LeaderCardProps = Staff & {
  textAlign?: 'left' | 'right';
  imageSide?: 'left' | 'right';
};

export function LeaderCard({
                             name,
                             title,
                             image,
                             institution,
                             textAlign = 'left',
                             imageSide = 'left',
                           }: LeaderCardProps) {
  const fabricTexture = getFabricTexture(name);
  const isRightAligned = textAlign === 'right';
  const isImageOnRight = imageSide === 'right';

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: isImageOnRight ? '1fr 220px' : '220px 1fr' },
        gap: 2,
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: { xs: 300, sm: 220 },
          mx: { xs: 'auto', sm: 0 },
          order: { xs: 1, sm: isImageOnRight ? 2 : 1 },
        }}
      >
        <Box
          sx={{
            borderRadius: '1.2rem',
            p: 1.5,
            backgroundImage: `url(${fabricTexture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}>
          <Paper
            sx={{
              p: 1,
              borderRadius: '1rem',
              bgcolor: 'background.paper',
            }}
          >
            <Box sx={{ position: 'relative', aspectRatio: 1 }}>
              <ExportedImage
                src={image}
                alt={name}
                fill={true}
                style={{
                  borderRadius: '1rem',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </Box>
          </Paper>
        </Box>
      </Box>
      <Box
        sx={{
          pl: { xs: 0, sm: isImageOnRight ? 0 : 1 },
          pr: { xs: 0, sm: isImageOnRight ? 1 : 0 },
          display: 'flex',
          flexDirection: 'column',
          order: { xs: 2, sm: isImageOnRight ? 1 : 2 },
        }}
      >
        <Box
          sx={{
            my: 'auto',
            ml: { xs: 0, sm: isRightAligned ? 'auto' : 0 },
            mr: { xs: 'auto', sm: isRightAligned ? 0 : 'auto' },
            textAlign: { xs: 'left', sm: textAlign },
          }}
        >
          <Typography variant={'h5'} color={'primary.dark'}>
            {name}
          </Typography>
          <Typography variant={'body1'} color={'text.secondary'}>
            {title}
          </Typography>
          <Typography variant={'body1'} color={'text.secondary'}>
            {institution}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default LeaderCard;
