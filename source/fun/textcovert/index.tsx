
import { View, Text } from 'react-native'
import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor'
export const renderText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|```.*?```|`.*?`)/gs).filter(Boolean);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const boldText: string = part.slice(2, -2);
            let ygtinggal: string = parts[index - 1]
            const isi: string = ygtinggal.slice(-4)[0] == '\n' ? ygtinggal.slice(-3) : ''

            return <Text key={index} style={{ fontWeight: 'bold' }} className='text-orange-300 '>{isi + boldText}</Text>;
        } else if (part.startsWith('```') && part.endsWith('```')) {
            const codeText = part.slice(3, -3);
            const lang = codeText.split('\n' || '')[0]
            const l = lang.length
            const newcode = part.slice(3 + l, -3)
            return (
                <View key={index} style={{ padding: 5, borderRadius: 5, marginVertical: 8, overflow: 'scroll', width: 'auto' }} className='bg-slate-900 p-3'>
                    <Text style={{ fontFamily: 'monospace', fontSize: 14 }} className='text-red-300  border-b border-slate-400 p-2' >{lang == 'cpp' ? 'c++' : lang}</Text>
                    <CodeEditor language={lang} readOnly={true} initialValue={newcode} style={{ backgroundColor: 'transparent', width: '100%', fontSize: 12 }}
                    />
                </View>
            );
        } else if (part.startsWith('`') && part.endsWith('`')) {
            const codeText = part.slice(0, -1);
            return <Text key={index} className='text-red-300'>{codeText}</Text>
        }

        else {
            
            return <Text key={index}>{part.slice(0, -1)}</Text>;
        }
    });
};
