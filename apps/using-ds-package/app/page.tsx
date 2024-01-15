import { colors, spacing } from "@stylex-nxdev-issues/ds"

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    color: colors.primaryText,
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
});

export default async function Index() {
  return (
    <div {...stylex.props(styles.container)}>
      ...
    </div>
  );
}
