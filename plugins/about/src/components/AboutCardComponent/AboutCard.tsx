import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Box, Card, Typography } from '@material-ui/core';
import { Link } from '@backstage/core-components';
import { IconComponent, useApp } from '@backstage/core-plugin-api';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles({
  svgIcon: {
    display: 'inline-block',
    '& svg': {
      display: 'inline-block',
      fontSize: 'inherit',
      verticalAlign: 'baseline',
    },
  },
});

export const AboutCard = () => {
  const styles = useStyles();
  const app = useApp();
  const { entity } = useEntity();
  const iconResolver = (key?: string): IconComponent =>
    key ? app.getSystemIcon(key) ?? LanguageIcon : LanguageIcon;

  return (
    <Card>
      <Box display="flex" flexDirection="column" padding={2}>
        <Typography variant="h3" component="h2">
          {entity.metadata.title ?? entity.metadata.name}
        </Typography>
        <Box mb={1} />
        <Typography variant="body2" component="p">
          {entity.metadata.description}
        </Typography>
        {entity.metadata.links && (
          <Box mt={2}>
            <Typography variant="h6" component="h3">
              Links
            </Typography>
          </Box>
        )}
        {entity.metadata?.links?.map(link => {
          const Icon = iconResolver(link.icon);
          return (
            <Box display="flex">
              <Box mr={1} className={styles.svgIcon}>
                <Typography component="div">
                  {Icon ? <Icon /> : <LanguageIcon />}
                </Typography>
              </Box>
              <Box flexGrow="1">
                <Link to={link.url} target="_blank" rel="noopener">
                  {link.title || link.url}
                </Link>
              </Box>
            </Box>
          )
        })}
      </Box>
    </Card>
  );
};
