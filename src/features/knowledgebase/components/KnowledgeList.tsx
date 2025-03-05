import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Paper,
  TextField,
  Box,
  Chip,
  Tooltip
} from '@mui/material';
import { Info as InfoIcon, Search as SearchIcon } from '@mui/icons-material';
import { KnowledgeItem } from '../KBInterface';

interface KnowledgeListProps {
  items: KnowledgeItem[];
  onItemClick: (item: KnowledgeItem) => void;
}

export const KnowledgeList: React.FC<KnowledgeListProps> = ({ items, onItemClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState<KnowledgeItem[]>(items);

  useEffect(() => {
    const filtered = items.filter(item =>
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.aiAnnotations?.keywords?.some(keyword =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredItems(filtered);
  }, [items, searchQuery]);

  const getSourceTypeIcon = (sourceType: string) => {
    switch (sourceType) {
      case 'audio':
        return '🎵';
      case 'file':
        return '📄';
      case 'text':
        return '📝';
      default:
        return '❓';
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="搜索知识库内容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
          }}
        />
      </Box>

      <List>
        {filteredItems.map((item) => (
          <ListItem
            key={item.id}
            button
            onClick={() => onItemClick(item)}
            sx={{
              mb: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle1">
                    {getSourceTypeIcon(item.sourceType)}
                    {item.metadata.fileName || '未命名内容'}
                  </Typography>
                </Box>
              }
              secondary={
                <Box sx={{ mt: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.aiAnnotations?.summary || item.content.substring(0, 100) + '...'}
                  </Typography>
                  <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {item.aiAnnotations?.keywords?.map((keyword, index) => (
                      <Chip
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title="查看详情">
                <IconButton edge="end" onClick={() => onItemClick(item)}>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};