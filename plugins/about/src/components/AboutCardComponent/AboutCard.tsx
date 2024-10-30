import React from 'react';
import {
  Entity,
  getEntitySourceLocation,
  RELATION_OWNED_BY,
  RELATION_PART_OF,
} from '@backstage/catalog-model';
import {
  EntityRefLinks,
  getEntityRelations,
} from '@backstage/plugin-catalog-react';


import { makeStyles } from '@material-ui/core/styles';
import { catalogApiRef, useEntity } from '@backstage/plugin-catalog-react';
import { Box, Card, Chip, Grid, Typography } from '@material-ui/core';
import { Link } from '@backstage/core-components';
import { IconComponent, useApi, useApp } from '@backstage/core-plugin-api';
import LanguageIcon from '@material-ui/icons/Language';
// import useAsync from 'react-use/esm/useAsync';

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
  const sourceLink = entity.metadata.annotations ?
    entity.metadata.annotations['backstage.io/source-location']?.replace('url:', '') : undefined;
  // const owner = entity.relations ? entity.relations.find(r => r.type === 'owner') : undefined;

  const ownedByRelations = getEntityRelations(entity, RELATION_OWNED_BY);

  let entitySourceLocation:
    | {
      type: string;
      target: string;
    }
    | undefined;
  try {
    entitySourceLocation = getEntitySourceLocation(entity);
  } catch (e) {
    entitySourceLocation = undefined;
  }

  // const catalogApi = useApi(catalogApiRef);
  // const ownerEntity = owner ? catalogApi.getEntityByRef(owner.targetRef) : undefined;
  // const { value: ownerEntity, loading, error } = useAsync(async () => {
  //   if (owner) {
  //     return await catalogApi.getEntityByRef(owner.targetRef);
  //   }
  //   return null;
  // });
  return (
    <Card>
      <Box display="flex" flexDirection="column" padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h3" component="h2">
              {entity.metadata.title ?? entity.metadata.name}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            {sourceLink && (<>
              <Box display="flex" justifyContent="flex-end">
                <Link to={sourceLink} target="_blank" rel="noopener">
                  View Source
                </Link>
              </Box></>)}
          </Grid>
        </Grid>
        <Box mb={1} />
        <Typography variant="body2" component="p">
          {entity.metadata.description}
        </Typography>
        <Box mt={2}>
          {ownedByRelations.length > 0 && (
            <EntityRefLinks entityRefs={ownedByRelations} defaultKind="group" />
          )}
        </Box>

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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            {entity.metadata?.tags && (
              <Box mt={2}>
                <Typography variant="h6" component="h3">
                  Tags
                </Typography>
              </Box>
            )}
            <Box display="flex">
              {entity.metadata?.tags?.map(tag => (
                <Box mr={1} key={tag}>
                  <Chip label={tag} />
                </Box>
              ))}
            </Box>
          </Grid>
          <Grid item xs={6}>
            {entity.metadata?.labels && (
              <Box mt={2}>
                <Typography variant="h6" component="h3">
                  Labels
                </Typography>
              </Box>
            )}
            <Box mr={4}>
              {entity.metadata?.labels && Object.entries(entity.metadata.labels).map(([k, v]) => (
                <Box mr={1} key={k}>
                  <Chip label={`${k}:${v}`} />
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

// function getLocationTargetHref(
//   target: string,
//   type: string,
//   entitySourceLocation: {
//     type: string;
//     target: string;
//   },
// ): string {
//   if (type === 'url' || target.includes('://')) {
//     return target;
//   }

//   const srcLocationUrl =
//     entitySourceLocation.type === 'file'
//       ? `file://${entitySourceLocation.target}`
//       : entitySourceLocation.target;

//   if (type === 'file' || entitySourceLocation.type === 'file') {
//     return new URL(target, srcLocationUrl).href;
//   }

//   return srcLocationUrl;
// }
