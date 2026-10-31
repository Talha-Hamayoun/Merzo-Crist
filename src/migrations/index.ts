import * as migration_20260918_152107_initial from './20260918_152107_initial';
import * as migration_20260918_185252_media_prefix from './20260918_185252_media_prefix';
import * as migration_20261031_183059_merzo_collections from './20261031_183059_merzo_collections';

export const migrations = [
  {
    up: migration_20260918_152107_initial.up,
    down: migration_20260918_152107_initial.down,
    name: '20260918_152107_initial',
  },
  {
    up: migration_20260918_185252_media_prefix.up,
    down: migration_20260918_185252_media_prefix.down,
    name: '20260918_185252_media_prefix',
  },
  {
    up: migration_20261031_183059_merzo_collections.up,
    down: migration_20261031_183059_merzo_collections.down,
    name: '20261031_183059_merzo_collections'
  },
];
