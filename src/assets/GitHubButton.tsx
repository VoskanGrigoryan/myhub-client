import { Button, ButtonProps, Group } from '@mantine/core';
import classes from './ButtonAssets.module.css';
import { IconBrandGithub } from '@tabler/icons-react';


export function GithubButton(props: ButtonProps & React.ComponentPropsWithoutRef<'button'>) {
  return (
    <Button {...props} leftSection={<IconBrandGithub size={16} />} className={classes.githubButton} />
  );
}