import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import { Collapse } from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const handleToggle = (title: string) => {
    setOpenItems((prev: any) => ({
      ...prev,
      [title]: !prev[title], // Toggle the open state for the clicked item
    }));
  };

  return (
    <>
      <Logo />

      {slots?.topArea}

      <WorkspacesPopover data={workspaces} sx={{ my: 2 }} />

      <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const isActived = item.path === pathname;
              const hasChildren = !!item.children;
              const isOpen = openItems[item.title] || false;

              return (
                <Box key={item.title}>
                  <ListItem disableGutters disablePadding>
                    <ListItemButton
                      disableGutters
                      component={RouterLink}
                      href={item.path}
                      sx={{
                        pl: 2,
                        py: 1,
                        gap: 2,
                        pr: 1.5,
                        borderRadius: 0.75,
                        typography: 'body2',
                        fontWeight: 'fontWeightMedium',
                        color: 'var(--layout-nav-item-color)',
                        minHeight: 'var(--layout-nav-item-height)',
                        ...(isActived && {
                          fontWeight: 'fontWeightSemiBold',
                          bgcolor: 'var(--layout-nav-item-active-bg)',
                          color: 'var(--layout-nav-item-active-color)',
                          '&:hover': {
                            bgcolor: 'var(--layout-nav-item-hover-bg)',
                          },
                        }),
                      }}
                      onClick={hasChildren ? () => handleToggle(item.title) : undefined}
                    >
                      <Box component="span" sx={{ width: 24, height: 24 }}>
                        {item.icon}
                      </Box>

                      <Box component="span" flexGrow={1}>
                        {item.title}
                      </Box>

                      {hasChildren ? isOpen ? <ExpandLess /> : <ExpandMore /> : null}
                    </ListItemButton>
                  </ListItem>

                  {hasChildren && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <Box component="ul" sx={{ pl: 4 }}>
                        {item.children.map((child: any) => (
                          <ListItem disableGutters disablePadding key={child.title}>
                            <ListItemButton
                              disableGutters
                              component={RouterLink}
                              href={child.path}
                              sx={{
                                pl: 2,
                                py: 1,
                                gap: 2,
                                pr: 1.5,
                                borderRadius: 0.75,
                                typography: 'body2',
                                fontWeight: 'fontWeightMedium',
                                color: 'var(--layout-nav-item-color)',
                                minHeight: 'var(--layout-nav-item-height)',
                                ...(pathname === child.path && {
                                  fontWeight: 'fontWeightSemiBold',
                                  bgcolor: 'var(--layout-nav-item-active-bg)',
                                  color: 'var(--layout-nav-item-active-color)',
                                  '&:hover': {
                                    bgcolor: 'var(--layout-nav-item-hover-bg)',
                                  },
                                }),
                              }}
                            >
                              <Box component="span" sx={{ width: 24, height: 24 }}>
                                {child.icon}
                              </Box>

                              <Box component="span" flexGrow={1}>
                                {child.title}
                              </Box>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              );
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      <NavUpgrade />
    </>
  );
}
