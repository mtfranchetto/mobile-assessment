import { StyleSheet } from 'react-native';

export const todosStyles = StyleSheet.create({
  title: {
    color: 'black',
  },
});

export const usersStyles = StyleSheet.create({
  listRow: {
    padding: 16,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  listName: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  listDistance: {
    color: 'black',
    fontSize: 12,
  },
  listAddress: {
    color: 'black',
    fontSize: 12,
    marginBottom: 4,
  },
  detailName: {
    color: 'black',
  }
});
