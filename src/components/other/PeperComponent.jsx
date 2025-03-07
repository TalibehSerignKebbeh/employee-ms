import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

export default function DraggablePaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}