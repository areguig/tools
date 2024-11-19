'use client';

import { useState, useEffect } from 'react';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, AppBar, IconButton, CssBaseline } from '@mui/material';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Code, Compare, Link as LinkIcon, DataObject, Menu, ChevronLeft, Terminal, DarkMode, LightMode } from '@mui/icons-material';
import { useColorMode } from './ThemeRegistry';
import { useToolsStore } from './providers/ToolsStoreProvider';

const drawerWidth = 240;
const drawerCollapsedWidth = 65;

const tools = [
  { name: 'Base64', icon: <Code />, path: '/base64' },
  { name: 'UTM Builder', icon: <LinkIcon />, path: '/utm-builder' },
  { name: 'JSON Prettifier', icon: <DataObject />, path: '/prettyjson' },
  { name: 'Diff Tool', icon: <Compare />, path: '/difftool' },
  { name: 'Wisdom', icon: <Code />, path: 'https://areguig.github.io/wisdom', external: true },
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const { mode, toggleColorMode } = useColorMode();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const clearAllStates = useToolsStore(state => state.clearAllStates);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearAllStates();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [clearAllStates]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            {drawerOpen ? <ChevronLeft /> : <Menu />}
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Terminal sx={{ fontSize: 28 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              href="/"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                fontWeight: 600,
                '&:hover': {
                  opacity: 0.8,
                },
              }}
            >
              Code with AI Projects
            </Typography>
          </Box>
          <IconButton onClick={toggleColorMode} color="inherit" sx={{ ml: 1 }}>
            {mode === 'dark' ? <LightMode /> : <DarkMode />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? drawerWidth : drawerCollapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : drawerCollapsedWidth,
            boxSizing: 'border-box',
            transition: (theme) => theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List>
            {tools.map((tool) => (
              <ListItem key={tool.name} disablePadding>
                {tool.external ? (
                  <ListItemButton component="a" href={tool.path} target="_blank" rel="noopener noreferrer">
                    <ListItemIcon>{tool.icon}</ListItemIcon>
                    <ListItemText 
                      primary={tool.name} 
                      sx={{ 
                        opacity: drawerOpen ? 1 : 0,
                        transition: (theme) => theme.transitions.create('opacity', {
                          duration: theme.transitions.duration.enteringScreen,
                        })
                      }} 
                    />
                  </ListItemButton>
                ) : (
                  <Link href={tool.path} style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                    <ListItemButton
                      selected={pathname === tool.path}
                      sx={{
                        minHeight: 48,
                        justifyContent: drawerOpen ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: drawerOpen ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {tool.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={tool.name} 
                        sx={{ 
                          opacity: drawerOpen ? 1 : 0,
                          transition: (theme) => theme.transitions.create('opacity', {
                            duration: theme.transitions.duration.enteringScreen,
                          })
                        }} 
                      />
                    </ListItemButton>
                  </Link>
                )}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerOpen ? drawerWidth : drawerCollapsedWidth}px)` },
          ml: { sm: `${drawerOpen ? drawerWidth : drawerCollapsedWidth}px` },
          transition: (theme) => theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
