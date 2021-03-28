import { StyleSheet } from 'react-native';

export const todosStyles = StyleSheet.create({
  title: {
    color: 'black',
    flex: 1,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 8,
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    borderRadius: 8,
    flex: 1,
    padding: 8,
  },
  addContainer: {
    marginBottom: 24,
  },
  keyboard: {
    flex: 1,
  }
});

export const usersStyles = StyleSheet.create({
  listRow: {
    padding: 24,
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
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  detailAddress: {
    color: 'black',
    fontSize: 12,
    marginBottom: 4,
  },
  detailPhone: {
    color: 'black',
    fontSize: 12,
    marginBottom: 4,
  },
  detailContainer: {
    padding: 24,
  },
  actionsContainer: {
    flexDirection: 'row',
     marginBottom: 24,
  },
});
